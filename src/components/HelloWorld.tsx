import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './HelloWorld.css?module'

interface Props {
  msg1: string
}

@Component
export default class Calc extends VueComponent<Props> {

  @Prop()
  private msg1: string | undefined;

  render() {
    return (
      <div class={styles.hello}>
        <h1>{ this.msg1 }</h1>
      </div>
    )
  }
}
