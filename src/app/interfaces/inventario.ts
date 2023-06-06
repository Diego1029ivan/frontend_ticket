export interface Inventario {
    id?:                                  number;
    ruc_entidad?:                         number;
    codigo_patrimonial:                   string;
    denominacion_bien:                    string;
    actos_de_adquisicion_que_genera_alta?:string;
    nro_doc_adquisicion:                  string;
    fecha_adquisicion:                    Date;
    valor_adquisicion:                    string;
    tipo_uso_cuenta?:                     string;
    tipo_cuenta?:                         string;
    nro_cuenta_contable:                  string;
    cta_con_seguro:                       string;
    estado_bien:                          string;
    condicion:                            string;
    user_id?:                             number;
    created_at?:                           Date;
    updated_at?:                           Date;
    fecha_inventario:                      Date;
    desc_area:                             string;
    valor_neto:                            string;
}