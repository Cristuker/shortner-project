import { UserDTO } from "./dto/user.dto"
import { User } from "./user.entity"

export const userMapper = (userEntity: User): UserDTO => {
    return {
        id: userEntity.id,
        email: userEntity.email,
        password: userEntity.password,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
    }
}
