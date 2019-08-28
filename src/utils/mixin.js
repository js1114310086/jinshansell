export default {
  data() {
    return {
      visibleSearch: false,
      input: '',
      currentPage: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
      isAdd: true,
      loading: true,
      stockTypeList: [],
    }
  },
  methods: {
    //添加编辑接口
    addEdit(url, data) {
      this.$http.post(url, data).then(() => {
        this.$msgSuc("提交成功");
        this.afterAddEdit();
      }, (err) => {
        this.$msgErr(err.msg);
      })
    },
    afterAddEdit() {
    },
    //返回上个页面
    back() {
      this.$router.go(-1);
    },
    // 时间选择器change时间
    handleDate(val) {
      if (val) {
        this.beginTime = val[0];
        this.endTime = val[1];
        this.getList();
      } else {
        this.beginTime = '';
        this.endTime = '';
        this.getList();
      }
    },
    // 获取入库类型
    getStockType(type) {
      this.$http.post("merchant_goods_log/query_type", {
        type: type
      }, { type: 'form' }).then((res) => {
        this.stockTypeList = res;
      })
    },
    // 批量处理
    confirmBatch(val) {
      if (val && this.checkItemId.length > 0) {
        if (val == 'delete') {
          this.remove(this.checkItemId);
        } else if (val == 'shift') {
          this.shiftItem(this.checkItemId);
        } else if (val == 'restore') {
          this.restore(this.checkItemId);
        } else if (val == 'show') {
          this.batchShow(this.checkItemId, 1);
        } else if (val == 'hide') {
          this.batchShow(this.checkItemId, 0);
        } else if (val == 'close') {
          this.closeItem(this.checkItemId);
        }
      } else {
        this.$msgWar("未选择操作项");
      }
    },
    // 分页下一页
    next(val) {
      this.currentPage = val;
      this.getList();
    },
    // 全选change事件
    handleChangeAll(val) {
      if (val) {
        this.$refs.table.toggleAllSelection();
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 表格selection事件
    tableSelection(val) {
      let checkItemId = [];
      if (val.length == this.tableData.length) {
        this.$refs.pagination._data.checkAll = true;
      } else {
        this.$refs.pagination._data.checkAll = false;
      }
      val.forEach((item) => {
        checkItemId.push(item.id);
      });
      this.checkItemId = checkItemId;
    },
    // 显示商品图片
    getGoodImg(data) {
      if (data) {
        return data.split(',')[0]
      } else {
        return require('@/assets/image.png')
      }
    },
    getList(url, params) {
      this.loading = true;
      let param = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$http.post(url, Object.assign(param, params)).then((res) => {
        this.total = res.totalCount;
        this.tableData = res.list;
      }, (err) => {
        this.$msgErr(err.msg);
      }).finally(() => {
        this.loading = false;
      })
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.getList();
    },
    //上传单张图片
    uploadFile(file) {
      return new Promise((resolve, reject) => {
        if (file.target.files.length > 0) {
          let formData = new FormData();
          formData.append('file', file.target.files[0]);
          this.$http.post('merchant/upload_file', formData, {
            type: 'form',
            file: 'image'
          }).then((res) => {
            //this.uploadSuccess(res);
            resolve({
              imgUrl: res.imgUrl + res.image
            });
          }, (err) => {
            this.$msgErr(err.msg);
            reject(err);
          })
        }
      })
    },
    //上传图片
    uploadFiles(file) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('file', file);
        this.$http.post('merchant/upload_file', formData, {
          type: 'form',
          file: 'image'
        }).then((res) => {
          //this.uploadSuccess(res);
          resolve({
            imgUrl: res.imgUrl + res.image
          });
        }, (err) => {
          this.$msgErr(err);
          reject(err);
        })
      })
    },
    //表头样式
    headerStyle() {
      return {
        color: '#595757',
        background: '#F6F6F6',
        fontSize: '15px',
        borderLeft: '1px solid #b4b4b4',
        borderTop: '1px solid #b4b4b4',
        textAlign: 'center'
      }
    },
    //表格样式
    tdStyle() {
      return {
        color: '#595757',
        fontSize: '15px',
        borderLeft: '1px solid #b4b4b4',
        borderTop: '1px solid #b4b4b4',
        textAlign: 'center'
      }
    },
    showSearch() {
      this.visibleSearch = !this.visibleSearch;
    }
  }
}
