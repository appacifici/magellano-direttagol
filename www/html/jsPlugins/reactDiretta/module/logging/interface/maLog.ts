
export default interface MaLog {
    info( message:string ):         void;
    log( message:string ):          void;
    error( message:string ):        void;
    warning( message:string ):      void;
    table( message:Array<any> ):    void;
}