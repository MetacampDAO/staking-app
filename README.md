# staking-app


1. Go to program folder
```
cargo build
cargo build-bpf
solana program deploy ./target/deploy/metacamp-staking-app.so
```

2. Copy newly generated program id into .env

3. Install packages in client folder
```
npm i

```

4. Adjust main function
```
npm run rust

```
