<template>
	<div class="index-page">
		index
	</div>
</template>

<script>
	import resources from '../resources'
	import md5 from 'js-md5'
	import { Loading, Message } from 'element-ui'

	export default {
		data() {
			return {
			}
		},
		methods: {
			getUniversities() {
				console.log(111)
			},
		},
		mounted: function () {
		}
	}
</script>
<style lang="scss" scoped>
@import '../styles/index/index.scss';
</style>