import * as React from 'react'
import { 
  type BaseError,
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'

export function MintNFT() {
  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 

    // Assure-toi que la valeur de "tokenId" est utilisée correctement. 
    // Si tu veux simplement participer à la loterie, on n'a pas besoin de tokenId ici.
    writeContract({
      address: '0x30378D3724A273FfcadcB086E54DB4E8Ea47de51',
      abi,
      functionName: 'enter',
      // Pas de `args` requis ici car la fonction `enter` n'a pas d'arguments
      value: BigInt(formData.get('amount') as string), // Envoi d'une certaine quantité d'ether (par exemple .0001)
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    })

  return (
    <form onSubmit={submit}>
      <input name="amount" placeholder="0.0001" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Enter Lottery'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>En attente de confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmée.</div>} 
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  )
}
