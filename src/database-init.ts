import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

async function createDatabase() {
  const connection = await createConnection({
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${configService.get<string>('DB_NAME')}\`;`);
  await connection.end();
}

createDatabase().catch((err) => {
  console.error('Error creating database:', err);
});

export default createDatabase;