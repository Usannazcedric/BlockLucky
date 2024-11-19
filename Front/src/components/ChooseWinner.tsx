import { useState } from "react";
import { abi } from '../components/abi';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export default function ChooseWinner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handlePickWinner = async () => {
    try {
      setIsProcessing(true);
      setErrorMessage("");
      setSuccessMessage("");

      await writeContract({
        address: "0x30378D3724A273FfcadcB086E54DB4E8Ea47de51", // Adresse du contrat
        abi,
        functionName: "pickWinner", // Fonction à appeler
      });

      setSuccessMessage("Winner has been successfully chosen!");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error occurred while picking the winner.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="my-10 text-center">
      <button
        onClick={handlePickWinner}
        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
        disabled={isProcessing || isPending}
      >
        {isProcessing || isPending ? "Processing..." : "Choisir un Gagnant"}
      </button>

      {isConfirming && <p className="mt-4 text-gray-300">En attente de confirmation...</p>}
      {isConfirmed && <p className="mt-4 text-green-500">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}