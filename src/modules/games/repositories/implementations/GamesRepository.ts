import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .select("title")
      .from(Game, "games")
      .where(`%${param}% = title`)
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(id) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .select("*")
      .from(User, "users, games, users_games_games")
      .where(`users.id = users_games_games AND games.${id} = users_games_games`)
      .getMany()
      // Complete usando query builder
  }
}
