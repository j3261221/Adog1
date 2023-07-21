import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    const db = (await connectDB).db('adog');
    const result = await db.collection('slide').find().toArray();

    const slides = result.map((slide) => ({
        eachSlide: `url(${slide.eachSlide})`,
        title: slide.title,
        price: slide.price,
    }));

    res.status(200).json(slides);
}