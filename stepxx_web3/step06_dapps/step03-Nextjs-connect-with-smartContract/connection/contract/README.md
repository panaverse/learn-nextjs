# Getter or Setter

In setter we set the value.
In getter we get the value.

Points:

- When you call a setter function it creates a transaction that needs to be mined and costs gas because it changes the blockchain. Vice versa for getter function.
- No gas fees in getter because value is not changing in getter.
- if we add public to variable then we don't need getter, variable getter function is automatically created.
