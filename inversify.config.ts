import { Container } from 'inversify'
import 'reflect-metadata'

import { TYPES } from './src/lib/di/types'

// Controllers
import { ApiKeyController } from './src/controllers/ApiKeyController'
import { UserController } from './src/controllers/UserController'
import { ThreeDModelController } from './src/controllers/ThreeDModelController'
import { ThreeDModelFormatController } from './src/controllers/ThreeDModelFormatController'
import { ActionController } from './src/controllers/ActionController'
import { ResolutionController } from './src/controllers/ResolutionController'
import { CategoryController } from './src/controllers/CategoryController'
import { MainRoleController } from './src/controllers/MainRoleController'
import { SubRoleController } from './src/controllers/SubRoleController'
import { DownloadController } from './src/controllers/DownloadController'

// Services
import { ApiKeyService } from './src/services/ApiKeyService'
import { UserService } from './src/services/UserService'
import { ThreeDModelService } from './src/services/ThreeDModelService'
import { ThreeDModelFormatService } from './src/services/ThreeDModelFormatService'
import { ActionService } from './src/services/ActionService'
import { ResolutionService } from './src/services/ResolutionService'
import { CategoryService } from './src/services/CategoryService'
import { MainRoleService } from './src/services/MainRoleService'
import { SubRoleService } from './src/services/SubRoleService'
import { DownloadService } from './src/services/DownloadService'

const container = new Container()

// Controllers
container
  .bind<ApiKeyController>(TYPES.ApiKeyController)
  .to(ApiKeyController)
  .inSingletonScope()

container
  .bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope()

container
  .bind<ThreeDModelController>(TYPES.ThreeDModelController)
  .to(ThreeDModelController)
  .inSingletonScope()

container
  .bind<ThreeDModelFormatController>(TYPES.ThreeDModelFormatController)
  .to(ThreeDModelFormatController)
  .inSingletonScope()

container
  .bind<ActionController>(TYPES.ActionController)
  .to(ActionController)
  .inSingletonScope()

container
  .bind<ResolutionController>(TYPES.ResolutionController)
  .to(ResolutionController)
  .inSingletonScope()

container
  .bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController)
  .inSingletonScope()

container
  .bind<MainRoleController>(TYPES.MainRoleController)
  .to(MainRoleController)
  .inSingletonScope()

container
  .bind<SubRoleController>(TYPES.SubRoleController)
  .to(SubRoleController)
  .inSingletonScope()

container
  .bind<DownloadController>(TYPES.DownloadController)
  .to(DownloadController)
  .inSingletonScope()

// Services
container
  .bind<ApiKeyService>(TYPES.ApiKeyService)
  .to(ApiKeyService)
  .inSingletonScope()

container
  .bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope()

container
  .bind<ThreeDModelService>(TYPES.ThreeDModelService)
  .to(ThreeDModelService)
  .inSingletonScope()

container
  .bind<ThreeDModelFormatService>(TYPES.ThreeDModelFormatService)
  .to(ThreeDModelFormatService)
  .inSingletonScope()

container
  .bind<ActionService>(TYPES.ActionService)
  .to(ActionService)
  .inSingletonScope()

container
  .bind<ResolutionService>(TYPES.ResolutionService)
  .to(ResolutionService)
  .inSingletonScope()

container
  .bind<CategoryService>(TYPES.CategoryService)
  .to(CategoryService)
  .inSingletonScope()

container
  .bind<MainRoleService>(TYPES.MainRoleService)
  .to(MainRoleService)
  .inSingletonScope()

container
  .bind<SubRoleService>(TYPES.SubRoleService)
  .to(SubRoleService)
  .inSingletonScope()

container
  .bind<DownloadService>(TYPES.DownloadService)
  .to(DownloadService)
  .inSingletonScope()

export { container } 