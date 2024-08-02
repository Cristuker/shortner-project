import { UserDTO } from "./dto/user.dto"
import { User } from "./user.entity"

export const userMapper = (userEntity: User): UserDTO => {
    return {
        email: userEntity.email,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
    }
}
