import { PostgresCarsImageRepository } from '@modules/cars/infra/postgres/repositories/PostgresCarsImageRepository'
import { PostgresCarsRepository } from '@modules/cars/infra/postgres/repositories/PostgresCarsRepository'
import { PostgresCarsSpecificationsRepository } from '@modules/cars/infra/postgres/repositories/PostgresCarsSpecificationsRepository'
import { PostgresCategoriesRepository } from '@modules/cars/infra/postgres/repositories/PostgresCategoriesRepository'
import { PostgresSpecificationsRepository } from '@modules/cars/infra/postgres/repositories/PostgresSpecificationsRepository'
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICarsSpecificationsRepository } from '@modules/cars/repositories/ICarsSpecificationsRepository'
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

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  PostgresCarsImageRepository
)

container.registerSingleton<ICarsSpecificationsRepository>(
  "CarsSpecificationsRepository",
  PostgresCarsSpecificationsRepository
)