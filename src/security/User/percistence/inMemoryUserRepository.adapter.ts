
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/User.js';
import { UserRepository } from '../entity/application/port/UserRepository.port.js';

interface UserRow extends User {
  passwordHash: string | null;
}

/**
 * In-memory stand-in for your data layer (Prisma, Drizzle, TypeORM, ...).
 * Only `User` objects leave this class: password hashes stay inside.
 */
@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly rows = new Map<string, UserRow>();

  async create(
    email: string,
    { passwordHash = null, emailVerified = false }: { passwordHash?: string | null; emailVerified?: boolean } = {},
  ): Promise<User> {
    const row: UserRow = { id: randomUUID(), email: normalize(email), emailVerified, roles: ['customer'], passwordHash };
    this.rows.set(row.id, row);
    return toUser(row);
  }

  async findById(id: string): Promise<User | null> {
    const row = this.rows.get(id);
    return row ? toUser(row) : null;
  }

  /** For password sign-in only. */
  async findCredentials(email: string): Promise<{ user: User; passwordHash: string | null } | null> {
    const row = this.findRow(email);
    return row ? { user: toUser(row), passwordHash: row.passwordHash } : null;
  }

  private findRow(email: string) {
    const normalized = normalize(email);
    return [...this.rows.values()].find((row) => row.email === normalized);
  }
}

// As the package passes addresses to handlers: an accent typed as two code points matches the stored one.
const normalize = (email: string) => email.trim().normalize('NFC').toLowerCase();
const toUser = ({ id, email, emailVerified, roles }: UserRow): User => ({ id, email, emailVerified, roles: [...roles] });
