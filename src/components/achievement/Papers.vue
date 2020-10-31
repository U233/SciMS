<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科研成果</el-breadcrumb-item>
      <el-breadcrumb-item>论文成果</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-button type="primary" size="medium">录入论文</el-button>
        <el-button type="danger" size="medium" :disabled="selection.length === 0">删除论文</el-button>
        <el-button type="warning" size="medium" :disabled="selection.length === 0">导出信息</el-button>
      </el-row>
      <el-row>
        <el-table :data="paperList" style="width: 100%" max-height="250" border
          @selection-change="selectionChange"
          :header-cell-style="{background: '#f5f7fa'}">
          <!-- 序号列 -->
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <!-- 多选列 -->
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="title" label="论文题目" width="300px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">论文题目</div>
              <el-input class="columnInput" size="mini" clearable v-model="queryInfo.title"
                placeholder="请输入">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="authorName" label="论文作者" width="150px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">论文作者</div>
              <el-input class="columnInput" size="mini" clearable v-model="queryInfo.authorName"
                placeholder="请输入">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="periodical" label="发表期刊" width="200px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">发表期刊</div>
              <el-select class="columnInput" v-model="queryInfo.periodical" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in periodicalList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="发表日期" width="230px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">发表日期</div>
              <el-date-picker class="columnInput" style="width: 200px; padding-right: 0;" size="mini"
                v-model="queryInfo.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="论文类型" width="200px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">论文类型</div>
              <el-select class="columnInput" v-model="queryInfo.type" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in typeList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="accessionNumber" label="收录号" width="300px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">收录号</div>
              <el-input class="columnInput" size="mini" clearable v-model="queryInfo.accessionNumber"
                placeholder="请输入">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="subjectCate" label="学科门类" width="200px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">学科门类</div>
              <el-select class="columnInput" v-model="queryInfo.subjectCate" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in subjectCateList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="subject" label="一级学科" width="200px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">一级学科</div>
              <el-select class="columnInput" v-model="queryInfo.subject" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in subjectList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="attribution" label="成果归属" width="200px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">成果归属</div>
              <el-select class="columnInput" v-model="queryInfo.attribution" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in attributionList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="项目来源" width="250px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">项目来源</div>
              <el-select class="columnInput" v-model="queryInfo.source" multiple size="mini"
                collapse-tags placeholder="请选择">
                <el-option v-for="item in sourceList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="300px" align="center">
            <template slot="header" slot-scope="scope">{{scope.haha}}
              <div style="line-height: 14px;">备注</div>
              <el-input class="columnInput" size="mini" clearable v-model="queryInfo.remark"
                placeholder="请输入">
              </el-input>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" align="center" width="120" fixed="right">
            <template slot-scope="scope">{{scope.haha}}
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索条件表单
      queryInfo: {
        // 论文题目
        title: '',
        // 论文作者
        authorName: '',
        // 发表期刊数组
        periodical: [],
        // 发表日期区间
        date: '',
        // 论文类型数组
        type: [],
        // 收录号
        accessionNumber: '',
        // 学科门类
        subjectCate: [],
        // 一级学科
        subject: [],
        // 归属单位
        attribution: [],
        // 项目来源
        source: [],
        // 备注
        remark: '',
        // 当前页码
        pagenum: 1,
        // 当前页大小
        pagesize: 2
      },
      // 论文信息列表
      paperList: [{
        title: '论文题目',
        authorName: '论文作者',
        periodical: '发表期刊',
        date: '2016-05-02',
        type: '论文类型',
        accessionNumber: '收录号',
        subjectCate: '学科门类',
        subject: '一级学科',
        attribution: '归属单位',
        source: '项目来源',
        remark: '备注'
      }, {
        title: '论文题目',
        authorName: '论文作者',
        periodical: '发表期刊',
        date: '2016-05-02',
        type: '论文类型',
        accessionNumber: '收录号',
        subjectCate: '学科门类',
        subject: '一级学科',
        attribution: '归属单位',
        source: '项目来源',
        remark: '备注'
      }],
      // 期刊列表
      periodicalList: ['期刊1', '期刊2'],
      // 论文类型列表
      typeList: ['类型1', '类型2'],
      // 学科门类列表
      subjectCateList: ['学科门类1', '学科门类2'],
      // 一级学科列表
      subjectList: ['一级学科1', '一级学科2'],
      // 归属单位列表
      attributionList: ['单位1', '单位2'],
      // 项目来源列表
      sourceList: ['项目来源1', '项目来源2'],
      // 总共数据条数
      total: 2,
      // 表格多选记录
      selection: []
    }
  },
  created () {
    this.getPaperList()
  },
  methods: {
    // 获取论文成果列表
    getPaperList () {

    },
    // 表格多选选中项改变
    selectionChange (val) {
      this.selection = val
    },
    // 分页大小发生变化
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.queryInfo.pagenum = 1
      this.getPaperList()
    },
    // 页数发生变化
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getPaperList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.columnInput {
  width: 100%;
  line-height: 24px;
  margin-top: 10px;
}
</style>
