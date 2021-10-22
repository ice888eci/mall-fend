import utils from 'utils'
const state = () => ({
  historySearchTags: utils.GetSearch(),
})

const mutations = {
  addToHistorySearchTag(state, tag) {
    // 插入到最开头
    state.historySearchTags.unshift(tag)
    // 保存到sessionStorage里面
    utils.SetSearch(state.historySearchTags)
  },

  clearToHistorySearchTag(state) {
    state.historySearchTags = []
    // 移除键
    sessionStorage.removeItem('historySearchTags')
  },
}

const actions = {
  addHistorySearchTag({ commit, state }, tag) {
    const result = state.historySearchTags.findIndex(
      (item) => item.id == tag.id
    )
    if (result == -1) {
      commit('addToHistorySearchTag', tag)
    } else {
      state.historySearchTags.splice(result, 1)
      commit('addToHistorySearchTag', tag)
    }
  },
}

export default { namespaced: true, state, mutations, actions }
