import { getRepository, Repository } from 'typeorm';
import { Game } from '../../../games/entities/Game';

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
    .leftJoinAndSelect("user.games", "game")
    .where("user.id = :id", { id: user_id })
    .getRawOne();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('SELECT first_name FROM users ORDER BY first_name'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`SELECT * FROM users WHERE first_name='${first_name}' AND last_name='${last_name}'`);
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}

