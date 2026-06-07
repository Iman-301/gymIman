import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { In } from "typeorm";

interface User{
    userId: number;
    username: string;
    role: string;
    email: string;
}

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector, private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles=this.reflector.get<string[]>('roles', context.getHandler())

        if(!requiredRoles){
            return true
        }
        const request=context.switchToHttp().getRequest()
        const user:User=request.user;
        if (!user) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
        const hasRole=()=>requiredRoles.includes(user.role);
        if (!hasRole()) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true; 

    }
}