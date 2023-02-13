import {Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import * as config from '../config/config';


//=====================
//    Verifica token
//=====================

export const verificaToken = (req: any, res:Response, next:NextFunction) => {
    let token: any = req.get('Authorization');

    jwt.verify(token, config.SEED,(err: any, decoded: any) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

//=====================
//    Verifica AdminRole
//=====================

export const verificaAdminRole = (req: any, res:Response, next:NextFunction) => {

    let usuario: any = req.usuario;

    if(usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "Rol de usuario no autorizado para esta solicitud"
            }
        });
    }  
}