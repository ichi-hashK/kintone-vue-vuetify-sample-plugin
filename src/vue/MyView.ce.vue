<script setup>
import { ref, computed } from "vue";

// 📦 データ定義（元データは保持したまま）
const allItems = ref([
  {
    no: 1,
    name: "ユーザーA",
    file: "file_a.png",
    fileData: null,
    editing: false,
  },
  {
    no: 2,
    name: "ユーザーB",
    file: "file_b.jpg",
    fileData: null,
    editing: false,
  },
  {
    no: 3,
    name: "ユーザーC",
    file: "file_c.pdf",
    fileData: null,
    editing: false,
  },
]);

// 🔍 検索条件リスト（初期は1つ）
const searchConditions = ref([{ key: "name", value: "" }]);

// 📊 テーブルのヘッダー定義
const headers = [
  { text: "No", value: "no" },
  { text: "名前", value: "name" },
  { text: "ファイル", value: "file" },
];

// 🎯 行のハイライトクラス判定（アップロード済み）
function getRowClass(item) {
  return item.fileData ? "uploaded-row" : "";
}

// ✏️ 編集開始
function editFile(item) {
  item.editing = true;
}

// 💾 ファイル保存（オブジェクト保持＋表示用に名前も）
function saveFile(item, event) {
  const file = event.target.files[0];
  if (file) {
    item.file = file.name;
    item.fileData = file;
  }
  item.editing = false;
}

// ❌ 編集キャンセル
function cancelEdit(item) {
  item.editing = false;
}

// ➕ 検索条件追加
function addCondition() {
  searchConditions.value.push({ key: "name", value: "" });
}

// 🗑 条件削除
function removeCondition(index) {
  searchConditions.value.splice(index, 1);
}

// 🧠 オートサジェスト候補取得
function getSuggestions(key) {
  const values = allItems.value.map((item) => item[key]);
  return [...new Set(values)].filter(Boolean);
}

// 🔍 検索フィルター
const filteredItems = computed(() => {
  return allItems.value.filter((item) => {
    return searchConditions.value.every((cond) => {
      if (!cond.value) return true;
      const field = item[cond.key]?.toString()?.toLowerCase() ?? "";
      const searchValue = cond.value.toLowerCase();
      return field === searchValue;
    });
  });
});
</script>

<template>
  <!-- 🔍 サーチビルダー -->
  <div class="mb-4">
    <div
      v-for="(cond, index) in searchConditions"
      :key="index"
      class="d-flex align-center gap-2 mb-2"
    >
      <v-select
        v-model="cond.key"
        :items="['name', 'file']"
        label="対象"
        style="width: 120px"
        dense
        hide-details
      />
      <v-autocomplete
        v-model="cond.value"
        :items="getSuggestions(cond.key)"
        label="値"
        style="width: 200px"
        dense
        hide-details
      />
      <v-btn icon @click="removeCondition(index)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <v-btn color="primary" @click="addCondition" class="mr-2" size="small">
      ＋ 条件追加
    </v-btn>
  </div>

  <!-- 📊 データテーブル -->
  <v-data-table :headers="headers" :items="filteredItems" item-value="no">
    <template #item="{ item }">
      <tr :class="getRowClass(item)">
        <td>{{ item.no }}</td>
        <td>{{ item.name }}</td>
        <td>
          <div v-if="item.editing">
            <input
              type="file"
              @change="saveFile(item, $event)"
              style="width: 100px; font-size: 10px"
            />
            <v-btn size="x-small" @click="cancelEdit(item)">✖</v-btn>
          </div>
          <div v-else>
            {{ item.file }}
            <v-btn size="x-small" @click="editFile(item)">✏️</v-btn>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style scoped>
.uploaded-row {
  background-color: #e0f7fa !important;
  transition: background-color 0.3s ease;
}
</style>
