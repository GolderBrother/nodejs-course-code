import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Table',
  props: ['data'],
  setup(props) {
    return () => (
      <div class='table'>
        {props.data.map((item) => (
          <div class='row'>
            <div class='col'>{item.name}</div>
            <div class='col'>{item.age}</div>
            <div class='col'>{item.email}</div>
          </div>
        ))}
      </div>
    )
  },
})
