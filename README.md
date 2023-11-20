
# 📩 votingdapp 📩

  

# Introduction

  

Dapp Voting est une application décentralisée conçue pour faciliter des processus de vote transparents et sécurisés sur la blockchain.

 Développée avec NextJs, React, et Javascript, cette Dapp utilise Wagmi, Wiem, Chakra UI, et RainbowKit pour une expérience utilisateur optimale.

  
  

# 🔗Lien Utiles

Vidéo de démonstration: https://www.loom.com/share/47b4ad8c13904769b38f6024cbe3984d?sid=8a92ea81-e21b-4d22-9bcf-a7d46b8a96d1

  

✅ Déployé sur Vercel: https://votingdapp-1fekwhjf5-jonathans-projects-10198929.vercel.app/

✅ Smart contract déployé sur Sepolia: https://sepolia.etherscan.io/address/0x5a02ddf2124f13862a96a9525e59b749981d3a1a

✅ Contrat vérifié par etherscan 

  
  

## 👨‍💻Équipe de Développement

  

Maxime GOGNIES

 Jonathan DUGARD

  
  

## Détails Techniques

  

# 🖥️Backend (Smart Contract)

## Sécurité

### 🧨La faille a été corrigée comme suit :

Le calcul de la proposal avec le plus de votes se fait à chaque nouveau vote, ce qui permet d'éviter d'avoir à parcourir une boucle à la fin de la session de vote et donc ne pas s'exposer à une attaque de type Gas Limit DoS

### Bonnes Pratiques:

#### Implémentation suivant les standards de développement recommandés, natSpec, commentaires.


# 🛠️Architecture 

# Backend
- Hardhat
- Solidity
- Openzeppelin

# Frontend
- NextJS
- WAGMI
- Viem
- Chakra UI
- RainbowKit

## Description de la vue

#### Composant Main: Englobe tous les autres composants.

  

#### Nav: Barre de navigation en haut qui contient le bouton pour se connecter.

  

#### VoteProgressIndicator: Affiche le déroulement du workflow en temps réel.

  

#### ContractManager: Affiche des informations conditionnelles et contient DisplayProposals, qui liste les propositions.

  

#### ContractInfoDisplay: Affiche des informations sur le contrat, telles que le nombre de votants et de propositions, et propose des interfaces conditionnelles pour l'owner et les votants.
