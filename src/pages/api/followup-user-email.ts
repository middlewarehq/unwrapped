import { dec } from '@/api-helpers/auth-supplementary';
import { nodeTrack } from '@/api-helpers/node-events';
import { handleCatch, handleThen } from '@/utils/axios';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { identity, pickBy } from 'ramda';

const userEmailInput = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    return res.status(400).send({ success: false, error: 'Email is required' });
  }

  const token = req.cookies.ghct && dec(req.cookies.ghct);
  const userDetails = (token && (await getUserData(token))) as
    | UserData
    | undefined;
  const username = userDetails?.login;
  const fullName = userDetails?.name;

  const payload: ZapierPayload = pickBy(identity, {
    email: req.body.email,
    username: req.body.saveUsername && username,
    fullName: req.body.saveFullName && fullName
  });

  nodeTrack('FOLLOWUP_USER_EMAIL', payload);
  const zapierResponse = await sendToZapier(payload);

  return res.send({ status: zapierResponse.status });
};

export default userEmailInput;

type UserData = {
  login: string;
  name: string;
};

export async function getUserData(accessToken: string): Promise<UserData> {
  return axios
    .get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(handleThen)
    .catch(handleCatch);
}

interface ZapierPayload {
  email: string;
  username?: string;
  fullName?: string;
}

interface ZapierResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export async function sendToZapier(
  payload: ZapierPayload
): Promise<ZapierResponse> {
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  return axios
    .post(zapierWebhookUrl, payload)
    .then(handleThen)
    .catch(handleCatch);
}
