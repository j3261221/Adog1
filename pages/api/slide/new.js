import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        if (req.body.title == '') {
            return res.status(500).json('제목을 작성해주세요')
        }
        let db = (await connectDB).db('adog')
        let result = db.collection('slide').insertOne(req.body)
        res.redirect(302, '/admin/slide')
    }
} 