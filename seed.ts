import dotenv from 'dotenv'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { connections } from './data.ts'
import { Database } from './lib/database.types';

dotenv.config();

/**
 * connect to supabase
 * @returns supabaseClient
 */

const connect = () => {
    return createClient<Database>(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_KEY as string,
    );
}

// TODO: modify seed value to put labels as array
// TODO: fix profile not created on sign up (I can't put that as a trigger on the DB anymore)
// TODO: Priority by default is mid or medium
// TODO: seed the rating column

const seedConnections = async (client: SupabaseClient<Database>) => {
    const promises = connections.map(async connection => {
        const { data, error } = await client.from('connection').insert({ ...connection });
        if (error) {
            throw new Error(`Failed to seed job ${connection.id}`);
        }
        return data;
    });

    await Promise.all(promises).then(_ => {
        // console.log(`Seeded ${_.length} jobs`);
    }).catch(err => {
        throw err;
    });
}

const seed = () => {
    try {
        const client = connect();
        seedConnections(client)
            .then(res => res)
            .catch(err => {
                throw err;
            });

    } catch (err) {
        console.log(err)
    }
}

seed();