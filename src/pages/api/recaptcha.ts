import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const verifyRecaptcha = async (token: string) => {
    const secretKey = process.env.RECAPTHA_SECRET_KEY
    return await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    )
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const name = req.body.name
        const token = req.body.token

        console.log('name', name)

        // Recaptcha response
        const response = await verifyRecaptcha(token)

        console.log(response.data)
        if (response.data.success && response.data.score >= 0.5) {
            return res.status(200).json({
                status: 'Success',
                message: 'Thank you for contacting me.',
            })
        } else {
            return res.json({
                status: 'Failed',
                message: 'Something went wrong, please try again!!!',
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: 'Failed',
            message: 'Something went wrong, please try again!!!',
        })
    }
}
