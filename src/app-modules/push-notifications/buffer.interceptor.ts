import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class BufferInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...', next);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                map((jeje) => Buffer.from(jeje)),
            );
    }

}