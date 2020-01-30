<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width:100%">
      <el-table-column label="Data"
                       prop="date">
      </el-table-column>
      <el-table-column label="Name"
                       prop="name">
      </el-table-column>
      <el-table-column label="Address"
                       prop="address">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header"
                  slot-scope="scope">
          <el-input v-model="search"
                    size="mini"
                    placeholder="请输入关键字搜索" />
        </template>
        <ermplate slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </ermplate>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2020-01-14',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2020-01-14',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2020-01-14',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2020-01-14',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      search: '',
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style>
</style>