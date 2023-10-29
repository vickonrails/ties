import { EmailTemplate } from '@/components/email/template';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export interface MailOptions {
    from: string
    to: string
    subject: string
    message: string
}

interface NextApiRequestBody extends NextApiRequest {
    body: MailOptions
}

export interface ResponseBody {
    data?: unknown
    error?: unknown
}

async function GET(req: NextApiRequestBody, res: NextApiResponse<ResponseBody>) {
    const { subject, to, message } = req.body

    try {
        // TODO: waiting for resend domains to be configured, replace with domain once configured
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            text: '',
            subject,
            react: EmailTemplate({ message }),
        });

        // console.log(`Mail sent`)

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ error });
    }
}

export default GET