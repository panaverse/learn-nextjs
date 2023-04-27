# Storage vs Memory

- stotage:
  1 - Holds state variables.
  2 - Persistent.
  3 - Cost gas.
  4 - Like a computer HDD

- Memory:
  1 - Holds local variables defined inside functions if they are reference types.
  2 - Not persistence.
  3 - No gas.
  4 - Like a computer RAM.

# Value type:

A type is referred to as a value type if it holds the data (value) directly within the memory
owned by it. They t do not take more than 32 bytes of memory in size.

- bool, uint, int, address, byte, enum.

# Passing by value:

When a value type variable is assigned to another variable or when a value type variable is
sent as an argument to a function, the EVM creates a new variable instance and copies the
value of the original value type into the target variable. Changing values in original or target variables will not affect the value in another variable.

# Reference Types:

Reference types, unlike value types, do not store their values directly within the variables
themselves. Instead of the value, they store the address of the location where the value is
stored. They can take more than 32 bytes of memory in size.

- Arrays, Structs, mappings

# Passing by reference:

When a reference type variable is assigned to another variable or a reference type variable
is sent as an argument to a function, the EVM creates a new variable instance and copies
the pointer from the original variable into the target variable. Both the variables are pointing to the same address location. Changing values in the original or target variables will change the value in other variables also
