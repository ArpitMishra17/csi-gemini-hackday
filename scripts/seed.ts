import dotenv from 'dotenv';
import path from 'path';

// Load .env.local first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
// Load .env as fallback
dotenv.config();

import mongoose from 'mongoose';
import { careersSeedData } from '../data/seed-careers';
import { scenariosSeedData } from '../data/seed-scenarios';
import Career from '../models/Career';
import Scenario from '../models/Scenario';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/career-education';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Career.deleteMany({});
    await Scenario.deleteMany({});

    // Insert careers
    console.log('Inserting careers...');
    const careers = await Career.insertMany(careersSeedData);
    console.log(`Inserted ${careers.length} careers`);

    // Create a map of career slugs to IDs
    const careerMap: Record<string, mongoose.Types.ObjectId> = {};
    careers.forEach((career) => {
      careerMap[career.slug] = career._id;
    });

    // Insert scenarios for each career
    console.log('Inserting scenarios...');
    let totalScenarios = 0;

    for (const [careerSlug, scenarios] of Object.entries(scenariosSeedData)) {
      const careerId = careerMap[careerSlug];
      if (!careerId) {
        console.warn(`Career not found for slug: ${careerSlug}`);
        continue;
      }

      const scenariosWithCareer = scenarios.map((scenario) => ({
        ...scenario,
        careerId,
      }));

      await Scenario.insertMany(scenariosWithCareer);
      totalScenarios += scenarios.length;
      console.log(`Inserted ${scenarios.length} scenarios for ${careerSlug}`);
    }

    console.log(`\nSeeding complete!`);
    console.log(`- ${careers.length} careers`);
    console.log(`- ${totalScenarios} scenarios`);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
