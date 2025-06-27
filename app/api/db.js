import { db } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email } = req.body;

    try {
        await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(200).json({ message: 'User saved!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving user' });
    }
}

