
import { Pool } from '@neondatabase/serverless';

// We use the environment variable for the connection string
const connectionString = (import.meta as any).env?.VITE_DATABASE_URL;

// Function to get data for a specific user
export const fetchUserData = async (userId: string) => {
  if (!connectionString) {
    console.warn("VITE_DATABASE_URL is missing. Sync disabled.");
    return null;
  }

  try {
    const pool = new Pool({ connectionString });
    // We use a simple table structure: user_id (TEXT PK), data (JSONB)
    const result = await pool.query('SELECT data FROM user_data WHERE user_id = $1', [userId]);
    await pool.end();

    if (result.rows.length > 0) {
      return result.rows[0].data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching data from Neon:", error);
    return null;
  }
};

// Function to save data for a specific user
export const saveUserData = async (userId: string, data: any) => {
  if (!connectionString) return;

  try {
    const pool = new Pool({ connectionString });
    const jsonData = JSON.stringify(data);
    
    // Upsert query: Insert, or Update if user_id exists
    await pool.query(
      `INSERT INTO user_data (user_id, data, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (user_id) 
       DO UPDATE SET data = $2, updated_at = NOW()`,
      [userId, jsonData]
    );
    await pool.end();
  } catch (error) {
    console.error("Error saving data to Neon:", error);
  }
};
