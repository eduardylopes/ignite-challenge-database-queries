import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository
    .createQueryBuilder("users")
    .leftJoinAndSelect("users.games", "game")
    .where("users.id = :id", { id: `${user_id}` })
    .getOneOrFail();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('SELECT first_name FROM users ORDER BY first_name');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`SELECT * FROM users WHERE LOWER(first_name) LIKE LOWER('${first_name}') AND LOWER(last_name) LIKE LOWER('${last_name}')`);
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}

