import IStrand from "../drawing/IStrand";

interface IMathWorkerRequestMessage {
  strand: IStrand,
  offset: number,
}
  
export default IMathWorkerRequestMessage;
  