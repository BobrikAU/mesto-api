import express from 'express';
import { env } from 'process';
import mongoose from 'mongoose';

const app = express();
const { PORT = 3000 } = env;

mongoose.set('strictQuery', false);
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
}
main().then(() => console.log('База данных подключена')).catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Cервер работает на порту ${PORT}!!!`);
});
