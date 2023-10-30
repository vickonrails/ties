import dotenv from 'dotenv'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import connections from './data.json' assert {type: 'json'}
import { Database } from './lib/database.types';

dotenv.config();

/**
 * connect to supabase
 * @returns supabaseClient
 */

const connect = () => {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    );
}

const seedConnections = async (client: SupabaseClient<Database>) => {
    const promises = connections.map(async connection => {
        const { data, error } = await client.from('connection').insert({ ...connection });
        if (error) {
            throw new Error(`Failed to seed connection ${connection.id}`);
        }
        return data;
    });

    await Promise.all(promises).then(_ => {
        // 
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