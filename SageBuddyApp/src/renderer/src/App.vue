<script>
export default {
  data() {
    return {
      output: '',
      previousValue: null,
      operationFired: false

    }
  },
  
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmounted() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    clearField() {
      this.output = '';
    },
    setNegativeOrPositive() {
      this.output = this.output[0] === '-' ? this.output.slice(1) : `-${this.output}`;
    },
    calculatePercentage() {
      this.output = parseFloat(this.output)/100;
    },
    getNumber(number) {
      if (this.operationFired){
        this.output = '';
        this.operationFired = false;
      }
      this.output = `${this.output}${number}`;
    },
    handleKeyDown(event) {
      // Check if the pressed key is a number key
      if (event.key >= '0' && event.key <= '9') {
        this.getNumber(event.key);
      } else {
      // Handle other keys
      switch (event.key) {
        case '+':
          this.processOutput('add');
          break;
        case '-':
          this.processOutput('subtract');
          break;
        case '*':
          this.processOutput('multiply');
          break;
        case '/':
          this.processOutput('divide');
          break;
        case '=':
          this.updateOutput();
          break;
        case '%':
          this.calculatePercentage();
          break;
        case '.':
          this.getDot();
          break;
        case 'Enter':
          this.updateOutput(); // Handle Enter as well
          break;
        // Add more cases for other keys if needed
        }
      }
    },
    getDot() {
      if (this.output.indexOf('.') === -1) {
        this.output = this.output + '.';
      }
    },
    processOutput(string) {
      if (string == 'add') {
          this.operation = (a, b) => {
          return parseFloat(a) + parseFloat(b);
        }
      }else if(string == 'subtract') {
          this.operation = (a, b) => {
          return parseFloat(a) - parseFloat(b);
        }
      }else if(string == 'divide') {
          this.operation = (a, b) => {
          return parseFloat(a) / parseFloat(b);
        }
      }else if(string == 'multiply') {
          this.operation = (a, b) => {
          return parseFloat(a) * parseFloat(b);
        }
      }
      
      this.previousValue = this.output;
      this.operationFired = true;
    },
    
    updateOutput() {
      this.output = `${this.operation(this.previousValue , this.output)}`;
      this.previousValue = null;
    }
  },
  
}
</script>

<template>
  <div class="">
    <div class="table-responsive">
      <table class="table table-bordered">
        <tbody>
          <tr class="output ">
            <td colspan="4" class="result h2">{{ output || 0 }}</td>
          </tr>
          <tr class="text-center">
            <td class="cursor-pointer operation-color" @click="clearField">C</td>
            <td class="cursor-pointer operation-color" @click="setNegativeOrPositive">+/-</td>
            <td class="cursor-pointer operation-color" @click="calculatePercentage">%</td>
            <td class="lastColumn cursor-pointer" @click="processOutput('divide')">&#xf7;</td>
          </tr>
          <tr class="text-center">
            <td class="cursor-pointer" @click="getNumber('7')">7</td>
            <td class="cursor-pointer" @click="getNumber('8')">8</td>
            <td class="cursor-pointer" @click="getNumber('9')">9</td>
            <td class="lastColumn cursor-pointer" @click="processOutput('multiply')">x</td>
          </tr>
          <tr class="text-center">
            <td class="cursor-pointer" @click="getNumber('4')">4</td>
            <td class="cursor-pointer" @click="getNumber('5')">5</td>
            <td class="cursor-pointer" @click="getNumber('6')">6</td>
            <td class="lastColumn cursor-pointer" @click="processOutput('subtract')">-</td>
          </tr>
          <tr class="text-center">
            <td class="cursor-pointer" @click="getNumber('1')">1</td>
            <td class="cursor-pointer" @click="getNumber('2')">2</td>
            <td class="cursor-pointer" @click="getNumber('3')">3</td>
            <td class="lastColumn cursor-pointer" @click="processOutput('add')">+</td>
          </tr>
          <tr class="text-center">
            <td class="cursor-pointer" colspan="2" @click="getNumber('0')">0</td>
            <td class="cursor-pointer" @click="getDot">.</td>
            <td class="lastColumn cursor-pointer" @click="updateOutput">=</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.result {
  text-align: end;
  background-color: #333 !important;
  color: white !important;
}
.lastColumn {
  background-color: #fe9e05 !important;
  color: rgb(237, 237, 237) !important;
  font-weight: bold;
}
.lastColumn:active {
  background-color: #333;
  color: #fff;
}
.cursor-pointer {
  cursor: pointer !important;;
}
.operation-color{
  background-color: #a3a5a6 !important;
  font-weight: bold;
}
</style>
