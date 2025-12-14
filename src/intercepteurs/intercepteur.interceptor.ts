import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class IntercepteurFiltre implements NestInterceptor {
    intercept(context : ExecutionContext , next : CallHandler): Observable<any>{
        const request = context.switchToHttp().getRequest()
        const role = request.query.role;
        return next.handle().pipe(
            map((data)=>{
                const userTransform = (user :any)=>{
                    if(role ==='admin'){
                        return {id : user.id, email : user.email, role : user.role , createdAt : user.createdAt, updatedAt : user.updatedAt }
                    }
                    else if(role==='client'){
                        return {id : user.id, email : user.email }


                    
                    }
                    return user;
                }
                if(Array.isArray(data)){
                    return data.map(userTransform);
                }
                return userTransform(data);
                 
            }
    ));
    }
}