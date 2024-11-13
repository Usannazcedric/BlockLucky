<template>
  <div class="centered">
    <button @click="connectWallet" v-if="!walletAddress">Connecter Wallet</button>
    <div v-if="walletAddress">Wallet connecté: {{ walletAddress }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletAddress: null,
      provider: null,
      signer: null,
    };
  },
  mounted() {
    // Vérifier si un wallet est déjà connecté lors du chargement de la page
    this.checkIfWalletIsConnected();

    // Écouter les changements de compte Metamask
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    }
  },
  beforeUnmount() {
    // Nettoyer l'écouteur lorsque le composant est détruit
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
    }
  },
  methods: {
    // Fonction pour vérifier si le wallet est déjà connecté
    async checkIfWalletIsConnected() {
      console.log('Vérification de la connexion au wallet...');
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          this.walletAddress = accounts[0];
          console.log('Wallet déjà connecté:', this.walletAddress);
        } else {
          console.log('Aucun wallet connecté');
        }
      } else {
        alert('Metamask n\'est pas installé');
      }
    },

    // Fonction pour gérer les changements de compte
    handleAccountsChanged(accounts) {
      if (accounts.length > 0) {
        this.walletAddress = accounts[0];
        console.log('Changement de compte détecté, nouveau wallet connecté:', this.walletAddress);
      } else {
        this.walletAddress = null;
        console.log('Compte déconnecté');
      }
    },

    // Fonction pour se connecter au wallet
    async connectWallet() {
      console.log('Tentative de connexion au wallet...');
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Adresse récupérée:', accounts[0]);

          this.provider = window.ethereum;
          this.signer = this.provider;

          this.walletAddress = accounts[0];

          console.log('Wallet connecté:', this.walletAddress);

          this.$nextTick(() => {
            console.log('Vue a mis à jour l\'affichage de l\'adresse:', this.walletAddress);
          });
        } catch (error) {
          console.error('Erreur de connexion à Metamask:', error);
        }
      } else {
        alert('Metamask n\'est pas installé');
      }
    },
  },
};
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
