import crypto from 'crypto';
import dbClient from '../utils/db.mjs';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
        const user = await dbClient.db.collection('users');

        user.collection.findOne({ email }).then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            usersCollection.insertOne({
                email,
                password: hashedPassword,
              }).then(
                (result) => {res.status(201).json({id: result.insertedId,email,
                  });
                }
            );
        });
    }
}
