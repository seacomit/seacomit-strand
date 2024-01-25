import './ControlBoxComponent.css';
import IStrand from './drawing/IStrand';
import TriangularStrand from './drawing/TriangularStrand';
import IFactorLockTest from './primes/FactorLockTest';

type ControlBoxComponentProps = {
    waveStartN: number;
    factorLockM: number;
    currentStrand: IStrand;
    factorLockState: IFactorLockTest[];
    isWorking: boolean;
    handleStartNInput: Function,
    handleFactorLockMInput: Function,
    handleLockClick: Function,
    handleUnlockClick: Function
};

export default function ControlBoxComponent({waveStartN,  factorLockM, currentStrand, factorLockState, isWorking, handleStartNInput, handleFactorLockMInput, handleLockClick, handleUnlockClick}: ControlBoxComponentProps) {
    return (
        <div className="ControlBox">
            <label className="InputLabel">Starting Prime: </label>
            <input type='number' value={waveStartN} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => handleStartNInput(ev)} />
            <label className="InputLabel">Triangular Number Multiple: </label>
            <input type='number' value={factorLockM} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => handleFactorLockMInput(ev)} />
            <button className="LockButton" onClick={() => handleLockClick()}>Lock</button>
            <button disabled={isWorking || (currentStrand as TriangularStrand) == null} className="LockButton" onClick={() => handleUnlockClick()}>Unlock</button>
            <div className="LockSequenceText">{currentStrand.toString()}</div>
            <div className="LockedFactors">{factorLockState.map(factorLockTest => <span key={factorLockTest.divisor.toString()} className={factorLockTest.locked ? "LockedFactorItem" : "NotLockedFactorItem"}>{factorLockTest.divisor.toString()}</span>)}</div>
        </div>
   );
};
