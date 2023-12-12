import { NextApiRequest, NextApiResponse } from 'next';
// import { getCardLinksFromGithubData } from '@/api-helpers/general';
import { hashSync, genSaltSync } from 'bcrypt';

const getRandomSuffix = (username: string) =>
  hashSync(username, process.env.USERNAME_HASHING_SALT).slice(-4);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    salt: genSaltSync(2),
    ry: getRandomSuffix('ry'),
    rz: getRandomSuffix('rz'),
    jayantbh2: getRandomSuffix('jayantbh2'),
    'samad-yar-khan': getRandomSuffix('samad-yar-khan'),
    'e-for-eshaan': getRandomSuffix('e-for-eshaan'),
    'shivam-bit': getRandomSuffix('shivam-bit')
  });
};

export default handler;
