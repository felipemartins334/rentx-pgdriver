import { PostgresCarsRepository } from '@modules/cars/infra/postgres/repositories/PostgresCarsRepository'
import { PostgresCategoriesRepository } from '@modules/cars/infra/postgres/repositories/PostgresCategoriesRepository'
import { PostgresSpecificationsRepository } from '@modules/cars/infra/postgres/repositories/PostgrespecificationsRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { PostgresUsersRepository } from '@modules/users/infra/postgres/repositories/PostgresUsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  PostgresCategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  PostgresSpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  PostgresUsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  PostgresCarsRepository
)