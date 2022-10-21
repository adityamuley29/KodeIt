const stubs = {};

stubs.c = `// Online C compiler to run C program online

#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world!");

    return 0;
}
`;

stubs.cpp = `// Online C++ compiler to run C++ program online

#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write C++ code here
    cout << "Hello world!";

    return 0;
}

`;

stubs.py = `# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.

print("Hello world")
`;

stubs.java = `// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

export default stubs;
