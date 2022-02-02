<div id="top"></div>

# Selective Disclosure of Virtual Credentials through Hash Functions
Study of the blockchain and JSON Web Token standard to represent W3C Verifiable Credential and to selectively disclose individual claims of the virtual credential.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This project is based on the following components:
* [JSON Web Token](https://jwt.io/): a standard for representing, decode, verify and generate claims securely between two parties.
* [W3C DIDs](https://www.w3.org/TR/did-core/) and [Verifiable Credential](https://www.w3.org/TR/vc-data-model/): A globally unique persistent identifier that is controlled by users and a data model and representation format for cryptographically-verifiable digital credentials.


<!-- GETTING STARTED -->
## Getting Started

The signature algorithms supported by this project to sign and verify credential are:
* ES256K: ECDSA with the secp256k1 as public key, sha256 as cryptographic hash function, and EcdsaSecp256k1VerificationKey2019 as verification method
* ES256K-R: ECDSA over secp256k1 with encoded recovery bit and EcdsaSecp256k1RecoveryMethod2020 as verification method
* EdDSA: EdDSA signature scheme using SHA-512, Curve25519, and Ed25519VerificationKey2018 as verification algorithm

Tha supported hash functions depends on available digest algorithms of the OpenSSL:
 ```sh
   openssl list -digest-algorithms
   ```

### Prerequisites

This software is written in Javascript and in can be runned using node.js 14. DIDs used in this project belong to the [`did:ethr`](https://github.com/uport-project/ethr-did) method and the can resolved using [ethr-did-resolver](https://github.com/decentralized-identity/ethr-did-resolver) and [ethr-did-registry](https://github.com/uport-project/ethr-did-registry).

### Installation

The steps below are necessary to install and setting up the experiments. 

1. Start a local instance of the blockchain (default: Ganache)
   ```sh
   ganache-cli -m "family dress industry stage bike shrimp replace design author amateur reopen script" -p 9545
   ```
2. Deploy the smart contract [registry](https://github.com/uport-project/ethr-did-registry/blob/develop/contracts/EthereumDIDRegistry.sol) for DID resolution
   ```sh
   truffle migrate
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
   
<!-- USAGE EXAMPLES -->
## Usage

Run scripts by using node
   ```sh
   node /path/to/script
   ```
  

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Andrea De Salve - andrea.desalve@cnr.it - http://pages.di.unipi.it/desalve/

Project Link: [PISA DISTRIBUTED LEDGER LAB](https://sites.google.com/unipi.it/pisadltlaboratory)

