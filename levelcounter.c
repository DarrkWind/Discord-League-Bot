#include <stdio.h>
#include <stdlib.h>

int main(){
    int i;
    int num = 0;
    for (i = 1; i <= 100; i++){
        num += 200;
        printf("\"Level %d\": %d,\n",i+1,num);
    }
    return 0;
}