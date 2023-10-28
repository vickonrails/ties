import { EmailTemplate } from '@/components/email/template';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface MailOptions {
    from: string
    to: string
    subject: string
    fullname: string
}

console.log(process.env.RESEND_API_KEY)

interface NextApiRequestBody extends NextApiRequest {
    body: MailOptions
}

export interface ResponseBody {
    data?: unknown
    error?: unknown
}

async function GET(req: NextApiRequestBody, res: NextApiResponse<ResponseBody>) {
    const { from, fullname: name, subject, to } = req.body
    res.status(200).json({ data: { success: true } })

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'victorofoegbu0009@gmail.com',
            text: '',
            subject,
            react: EmailTemplate({ name }),
        });

        console.log(`Mail sent`)

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export default GET