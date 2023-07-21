import { connectDB } from "util/database";
import bcrypt from "bcrypt";
import { toast } from "react-toastify";

export default async function handler(request, response) {
    if (request.method === "POST") {
        const { name, email, password } = request.body;
        let db = (await connectDB).db('adog');

        if (!name || !email || !password) {
            response.redirect(302, '/auth/signIn')
        }

        const checkExist = await db.collection('user_cred').findOne({ email })
        if (checkExist) {
            response.redirect(302, '/auth/signIn')
        }
        const hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;


        await db.collection('user_cred').insertOne(request.body);
        response.redirect(302, '/auth/signIn')
    }
};